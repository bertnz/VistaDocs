using System.Collections.Generic;
using Umbraco.Core.Models;
using Umbraco.Web;

namespace Vista.Docs.App.Navigation
{
    public class SideNavigationBuilder
    {
        public static List<TreeViewNode> BuildMenu(IPublishedContent rootNode, IPublishedContent selectedNode)
        {
            List<int> ancestorIds = new List<int>();
            foreach (var ancestor in selectedNode.AncestorsOrSelf())
            {
                ancestorIds.Add(ancestor.Id);
            }
            var childNodes = rootNode.Children;
            List<TreeViewNode> rootNodes = new List<TreeViewNode>();
            if (childNodes != null)
            {
                foreach (var childUmbracoNode in childNodes)
                {
                    var childTreeNode = new TreeViewNode();
                    rootNodes.Add(childTreeNode);
                    RecurseNode(childTreeNode, childUmbracoNode, selectedNode, ancestorIds);
                }
            }
            return rootNodes;
        }

        private static void RecurseNode(TreeViewNode currentNode, IPublishedContent umbracoNode, IPublishedContent selectedNode, List<int> selectedNodeAncestors)
        {
            currentNode.State.Expanded = selectedNodeAncestors.Contains(umbracoNode.Id);
            currentNode.Text = umbracoNode.Name;

            currentNode.State.Selected = umbracoNode.Id == selectedNode.Id;
            currentNode.Selectable = !umbracoNode.GetPropertyValue<bool>("expansionHeaderOnly");
            currentNode.Href = currentNode.Selectable ? umbracoNode.Url : null;
            currentNode.Nodes = new List<TreeViewNode>();
            if (umbracoNode.Children != null)
            {
                foreach (var childUmbracoNode in umbracoNode.Children)
                {
                    var childTreeNode = new TreeViewNode();
                    currentNode.Nodes.Add(childTreeNode);
                    RecurseNode(childTreeNode, childUmbracoNode, selectedNode, selectedNodeAncestors);
                }
            }
        }
    }
}