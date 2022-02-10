using part2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Data.SqlClient;

namespace part2.Controllers
{
    public class HomeController : Controller
    {
         // = new Image_Class("Img1", "~/imgs/img1.jpg", "Image one description");
        List<Image_Class> pictures = new List<Image_Class>();

        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=part2_images;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        public HomeController()
        {
            //pictures.Add(new Image_Class("Img1", "~/imgs/img1.jpg", "Image one description"));
            //pictures.Add(new Image_Class("Img2", "~/imgs/img2.jpg", "Image two description"));
            //pictures.Add(new Image_Class("Img3", "~/imgs/img3.jpg", "Image three description"));

            string queryString = "SELECT * FROM [dbo].[p2_images];";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
               SqlCommand command = new SqlCommand(queryString, connection);

                connection.Open();
                SqlDataReader reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Image_Class picture = new Image_Class(reader.GetInt32(0), reader.GetString(1), reader.GetString(2), reader.GetString(3));

                        pictures.Add(picture);
                    }

    
                }

            }


            
        }

        public ActionResult Index()
        {
            //Tuple<Image_Class, int> image_and_index = new Tuple<Image_Class, int>(pictures[0], 0);
            //Session["Image_index"] = 0;

            //var json = File.ReadAllText("~/Json/imgData.json");

            return View("Index", pictures);


        }

      

        [HttpPost]
        public ActionResult btn_onClickNext()
        {
            var index = (int)Session["Image_index"];
            index++;

            if(index == pictures.Count)
            {
                index = 0;
            }
            Session["Image_index"] = index;

            return PartialView("~/Views/Image/_Image.cshtml", pictures[index]);
        }

        [HttpPost]
        public ActionResult btn_onClickPrev()
        {
            var index = (int)Session["Image_index"];
            index--;

            if (index < 0)
            {
                index = pictures.Count-1;
            }
            Session["Image_index"] = index;

            return PartialView("~/Views/Image/_Image.cshtml", pictures[index]);
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}