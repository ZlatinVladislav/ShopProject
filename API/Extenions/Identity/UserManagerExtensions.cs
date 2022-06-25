using Core.Entities.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extenions.Identity
{
    public static class UserManagerExtensions
    {
        public static async Task<AppUser> FindByClaimsPrincipalWithEmailAddressAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailFromClaimsAsync(this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
