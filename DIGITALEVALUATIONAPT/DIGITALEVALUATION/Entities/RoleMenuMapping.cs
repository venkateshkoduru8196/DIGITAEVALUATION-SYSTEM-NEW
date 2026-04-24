using System.ComponentModel.DataAnnotations;
using System.Data;
using DIGITALEVALUATION.Models;
using  Microsoft.AspNetCore.Identity;

namespace DIGITALEVALUATION.Entities
{
    public class RoleMenuMapping
    {
        [Key]
        public int Id { get; set; }

        public string RoleId { get; set; }
        public int MenuId { get; set; }

        public bool CanView { get; set; }
        public ApplicationRole Role { get; set; }
        public MenuMaster Menu { get; set; }
    }
}
