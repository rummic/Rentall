namespace Rentall
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    using AutoMapper;

    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.IdentityModel.Tokens;

    using Rentall.Commons.Helpers;
    using Rentall.DAL.Config;
    using Rentall.DAL.Model;
    using Rentall.DAL.Repositories;
    using Rentall.DAL.Repositories.IRepositories;
    using Rentall.Services.Dtos.OfferDto;
    using Rentall.Services.Dtos.UserDto;
    using Rentall.Services.ModelServices.CategoryService;
    using Rentall.Services.ModelServices.OfferService;
    using Rentall.Services.ModelServices.OfferTypeService;
    using Rentall.Services.ModelServices.PhotoService;
    using Rentall.Services.ModelServices.UserService;

    using Swashbuckle.AspNetCore.Swagger;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>();
            services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new Info { Title = "Rentall API", Version = "v1" });
                    c.AddSecurityDefinition(
                        "Bearer",
                        new ApiKeyScheme
                        {
                            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: bearer {token}\"",
                            Name = "Authorization",
                            In = "header",
                            Type = "apiKey"
                        });
                    c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                                                 {
                                                     { "Bearer", Enumerable.Empty<string>() }
                                                 });
                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddScoped<IUsersRepository, UsersRepository>();
            services.AddScoped<IUsersService, UsersService>();
            services.AddScoped<IOffersRepository, OffersRepository>();
            services.AddScoped<IOffersService, OffersService>();
            services.AddScoped<ICategoriesRepository, CategoriesRepository>();
            services.AddScoped<ICategoriesService, CategoriesService>();
            services.AddScoped<IOfferTypesRepository, OfferTypesRepository>();
            services.AddScoped<IOfferTypesService, OfferTypesService>();
            services.AddScoped<IPhotosRepository, PhotosRepository>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddCors(opt => opt.AddPolicy("policy", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<User, GetUserByIdDto>();
                cfg.CreateMap<User, GetUsersDto>();
                cfg.CreateMap<AddUserDto, User>();
                cfg.CreateMap<Offer, GetOfferByIdDto>();
                cfg.CreateMap<AddOfferDto, Offer>()
                    .ForMember(x => x.User, o => o.Ignore())
                    .ForMember(x => x.Category, o => o.Ignore())
                    .ForMember(x => x.OfferType, o => o.Ignore());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors("policy");
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Rentall API"));
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
