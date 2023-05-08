using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.DTOs
{
    public class MovieTheaterCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 75)]
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
