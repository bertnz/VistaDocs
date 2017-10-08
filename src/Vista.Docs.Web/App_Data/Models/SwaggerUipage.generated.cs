//------------------------------------------------------------------------------
// <auto-generated>
//   This code was generated by a tool.
//
//    Umbraco.ModelsBuilder v3.0.7.99
//
//   Changes to this file will be lost if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web;
using Umbraco.Core.Models;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Umbraco.ModelsBuilder;
using Umbraco.ModelsBuilder.Umbraco;

namespace Umbraco.Web.PublishedContentModels
{
	/// <summary>Swagger UI Page</summary>
	[PublishedContentModel("swaggerUIPage")]
	public partial class SwaggerUipage : PublishedContentModel
	{
#pragma warning disable 0109 // new is redundant
		public new const string ModelTypeAlias = "swaggerUIPage";
		public new const PublishedItemType ModelItemType = PublishedItemType.Content;
#pragma warning restore 0109

		public SwaggerUipage(IPublishedContent content)
			: base(content)
		{ }

#pragma warning disable 0109 // new is redundant
		public new static PublishedContentType GetModelContentType()
		{
			return PublishedContentType.Get(ModelItemType, ModelTypeAlias);
		}
#pragma warning restore 0109

		public static PublishedPropertyType GetModelPropertyType<TValue>(Expression<Func<SwaggerUipage, TValue>> selector)
		{
			return PublishedContentModelUtility.GetModelPropertyType(GetModelContentType(), selector);
		}

		///<summary>
		/// Service Overview: Description of service, appears above Swagger UI
		///</summary>
		[ImplementPropertyType("serviceOverview")]
		public IHtmlString ServiceOverview
		{
			get { return this.GetPropertyValue<IHtmlString>("serviceOverview"); }
		}

		///<summary>
		/// Service Title: Title of service
		///</summary>
		[ImplementPropertyType("serviceTitle")]
		public string ServiceTitle
		{
			get { return this.GetPropertyValue<string>("serviceTitle"); }
		}

		///<summary>
		/// Swagger File URL: URL to the swagger file to display
		///</summary>
		[ImplementPropertyType("swaggerFileURL")]
		public string SwaggerFileUrl
		{
			get { return this.GetPropertyValue<string>("swaggerFileURL"); }
		}
	}
}
