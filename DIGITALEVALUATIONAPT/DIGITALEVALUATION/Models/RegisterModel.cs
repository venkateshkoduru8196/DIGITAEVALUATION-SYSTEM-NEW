using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.Models
{
    public class RegisterModel
    {

        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(50)]
        public string Username { get; set; }

        [StringLength(128)]
        public string Email { get; set; }

        [StringLength(256)]
        public string Password { get; set; }
        public int institution_id { get; set; }

        public string user_type { get; set; }

        public string full_name { get; set; }

        public string? phone { get; set; }

        public string? gender { get; set; }

        public DateTime? date_of_birth { get; set; }

        public string? profile_photo { get; set; }

        public bool is_active { get; set; }

        public DateTime created_at { get; set; }

        public DateTime? updated_at { get; set; }

    }
}
