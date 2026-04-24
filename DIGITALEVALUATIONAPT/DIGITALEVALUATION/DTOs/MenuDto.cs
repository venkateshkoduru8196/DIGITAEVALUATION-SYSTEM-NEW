namespace DIGITALEVALUATION.DTOs
{
    public class MenuDto
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; } = string.Empty;
        public string? MenuUrl { get; set; }
        public string? Icon { get; set; }
        public int OrderNo { get; set; }
        public List<MenuDto> Children { get; set; } = new();
    }
}
