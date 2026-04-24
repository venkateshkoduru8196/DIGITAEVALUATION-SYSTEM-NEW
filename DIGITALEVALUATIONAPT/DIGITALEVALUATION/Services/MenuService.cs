using DIGITALEVALUATION.Contexts;
using DIGITALEVALUATION.DTOs;
using DIGITALEVALUATION.Entities;
using System;
using Microsoft.EntityFrameworkCore;

namespace DIGITALEVALUATION.Services
{
    public class MenuService : IMenuService
    {
        private readonly ApplicationDbContext _context;

        public MenuService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<MenuDto>> GetMenuByUserIdAsync(string userId)
        {

            var roleIds = await _context.UserRoles  
    .Where(x => x.UserId == userId)
    .Select(x => x.RoleId)
    .ToListAsync();


            // Step 1: Get User Roles
            //var roleIds = await _context.ap
            //    .Where(x => x.UserId == userId)
            //    .Select(x => x.RoleId)
            //    .ToListAsync();

            // Step 2: Get MenuIds from RoleMenuMapping
            var menuIds = await _context.RoleMenuMappings
                .Where(x => roleIds.Contains(x.RoleId) && x.CanView)
                .Select(x => x.MenuId)
                .Distinct()
                .ToListAsync();

            // Step 3: Get Menus
            var menus = await _context.MenuMasters
                .Where(m => menuIds.Contains(m.MenuId) && m.IsActive)
                .ToListAsync();

            // Step 4: Build Tree
            var menuTree = BuildMenuTree(menus, null);

            return menuTree;
        }

        private List<MenuDto> BuildMenuTree(List<MenuMaster> menus, int? parentId)
        {
            return menus
                .Where(m => m.ParentMenuId == parentId)
                .Select(m => new MenuDto
                {
                    MenuId = m.MenuId,
                    MenuName = m.MenuName,
                    MenuUrl = m.MenuUrl,
                    Icon = m.Icon,
                    Children = BuildMenuTree(menus, m.MenuId)
                })
                .OrderBy(m => m.OrderNo)
                .ToList();
        }
    }
}
