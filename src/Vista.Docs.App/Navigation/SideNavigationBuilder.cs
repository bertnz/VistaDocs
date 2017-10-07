using System.Collections.Generic;
using Umbraco.Core.Models;

namespace Vista.Docs.App.Navigation
{
    public class SideNavigationBuilder
    {
        public static List<TreeViewNode> BuildMenu(IPublishedContent rootNode)
        {
            var childNodes = rootNode.Children;
            List<TreeViewNode> rootNodes = new List<TreeViewNode>();
            if (childNodes != null)
            {
                foreach (var child in childNodes)
                {
                    var node = new TreeViewNode()
                    {
                        Text = child.Name
                    };
                    rootNodes.Add(node);
                    RecurseNode(node, child);
                }
            }
            return rootNodes;
        }

        private static void RecurseNode(TreeViewNode currentNode, IPublishedContent umbracoNode)
        {
            currentNode.Nodes = new List<TreeViewNode>();
            if (umbracoNode.Children != null)
            {
                foreach (var child in umbracoNode.Children)
                {
                    var node = new TreeViewNode()
                    {
                        Text = child.Name
                    };
                    currentNode.Nodes.Add(node);
                    RecurseNode(node, child);
                }
            }
        }
    }
}