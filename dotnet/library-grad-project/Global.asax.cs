﻿using Autofac;
using Autofac.Integration.WebApi;
using LibraryGradProject.Contexts;
using LibraryGradProject.Models;
using LibraryGradProject.Repos;
using System.Reflection;
using System.Web.Http;
using System.Web.Mvc;

namespace LibraryGradProject
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        { 

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            // Autofac
            var builder = new ContainerBuilder();            

            // Register Web API controllers
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register types
            builder.RegisterType<FilledBookRepository>().As<IRepository<Book>>().SingleInstance();
            builder.RegisterType<ReservationRepository>().As<IRepository<Reservation>>().SingleInstance();
            builder.RegisterType<LibraryContext>().As<ILibraryContext>().InstancePerLifetimeScope();

            // Set the dependency resolver to be Autofac
            var container = builder.Build();
            var config = GlobalConfiguration.Configuration;
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

        }
    }
}
