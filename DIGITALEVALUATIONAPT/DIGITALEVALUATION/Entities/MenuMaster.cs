using System.ComponentModel.DataAnnotations;

namespace DIGITALEVALUATION.Entities
{
    public class MenuMaster
    {
        [Key]
        public int MenuId { get; set; }
        public string MenuName { get; set; } = string.Empty;
        public string? MenuUrl { get; set; }
        public string? Icon { get; set; }

        public int? ParentMenuId { get; set; }
        public MenuMaster? ParentMenu { get; set; }
        public int OrderNo { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<MenuMaster>? Children { get; set; }
        public ICollection<RoleMenuMapping>? RoleMenus { get; set; }
    }
}
