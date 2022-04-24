using Core.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Infrastructure.Services
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cachedReponse = await _database.StringGetAsync(cacheKey);

            if (cachedReponse.IsNullOrEmpty)
            {
                return null;
            }

            return cachedReponse;
        }

        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            if (response == null)
            {
                return;
            }

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };

            var serializeResponse = JsonSerializer.Serialize(response, options);

            await _database.StringSetAsync(cacheKey, serializeResponse, timeToLive);
        }
    }
}
