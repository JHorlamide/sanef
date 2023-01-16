export default {
  name: "news",
  title: "News",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true
      } 
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        initialValue: new Date()
      }
    },
    {
      name: "headLine",
      title: "Head Line",
      type: "string"
    },
    {
      name: "details",
      title: "Details",
      type: "text"
    }
  ]
}