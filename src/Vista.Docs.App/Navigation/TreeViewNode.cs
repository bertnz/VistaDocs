using System.Collections.Generic;

namespace Vista.Docs.App.Navigation
{
    public class TreeViewNode
    {
        public string Text { get; set; }
        public string Icon { get; set; }
        public string SelectedIcon { get; set; }
        public string Color { get; set; }
        public string BackColor { get; set; }
        public string Href { get; set; }
        public bool Selectable { get; set; }
        public TreeViewNodeState State { get; set; }
        public List<string> Tags { get; set; }
        public List<TreeViewNode> Nodes { get; set; }

        public TreeViewNode()
        {
            State = new TreeViewNodeState();
        }
  
    }
}