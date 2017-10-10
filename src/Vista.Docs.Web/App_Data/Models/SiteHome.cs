using System.Linq;

namespace Umbraco.Web.PublishedContentModels
{
    public partial class SiteHome
    {
        public NewsFeed NewsFeed
        {
            get
            {
                var siblingsAsNewFeed = this.Children<NewsFeed>().ToList();
                return siblingsAsNewFeed.FirstOrDefault();
            }
        }
    }
}