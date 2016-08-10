using RestSharp;
using RestSharp.Authenticators;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using veggieburgerguy.Models;

namespace veggieburgerguy.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Gallery()
        {
            var userID = ConfigurationManager.AppSettings["IGUserID"];
            var accessToken = ConfigurationManager.AppSettings["IGAccessToken"];

            var client = new RestClient("https://api.instagram.com/v1");
            
            var request = new RestRequest(string.Format("users/{0}/media/recent/", userID));
            request.AddParameter("access_token", accessToken);

            var response = client.ExecuteDynamic(request);

            var images = new List<InstagramImage>();

            foreach(var d in response.Data.data)
                images.Add(new InstagramImage { Link = d.link, Url = d.images.low_resolution.url });

            return Json(images, JsonRequestBehavior.AllowGet);
        }

        public ActionResult OAuth()
        {
            return View();
        }
    }
}