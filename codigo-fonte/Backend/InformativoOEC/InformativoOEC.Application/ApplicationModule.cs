﻿using InformativoOEC.Application.Services.Account;
using InformativoOEC.Application.Services.Authentication;
using InformativoOEC.Application.Services.Event;
using InformativoOEC.Application.Services.EventPerson;
using InformativoOEC.Application.Services.News;
using InformativoOEC.Application.Services.Newsfeed;
using InformativoOEC.Application.Services.Post;
using InformativoOEC.Application.Services.RecoveryPassword;
using InformativoOEC.Application.Services.User;
using InformativoOEC.Core.Repositories;
using InformativoOEC.Infra.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace InformativoOEC.Application;
public static class ApplicationModule
{
    public static void AddApplication(this IServiceCollection services)
    {
        AddServices(services);
    }

    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        services
            .AddScoped<IUserService, UserService>()
            .AddScoped<IAuthService, AuthService>()
            .AddScoped<ILoginService, LoginService>()
            .AddScoped<IPostService, PostService>()
            .AddScoped<INewsfeedService, NewsfeedService>()
            .AddScoped<INewsService, NewsService>()
            .AddScoped<IEventService, EventService>()
            .AddScoped<IEventPersonService, EventPersonService>()
            .AddScoped<IRecoveryPasswordService, RecoveryPasswordService>();

        return services;
    }
}
