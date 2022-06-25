using System.Security.Claims;

namespace API.Extenions.Identity
{
    public static class ClaimPrincipalExtensions
    {
        public static string RetrieveEmailFromPrincipal(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }
    }
}
