using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace part2.Models
{
    public class Image_Class
    {
        public int img_id { get; set; }
        public string img_name { get; set; }

        public string img_location { get; set; }

        public string img_description { get; set; }

        public Image_Class(int img_id, string img_name, string img_location, string img_description)
        {
            this.img_id = img_id;
            this.img_name = img_name;
            this.img_location = img_location;
            this.img_description = img_description;
        }
    }
}