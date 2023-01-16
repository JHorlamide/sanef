export default {
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
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
      name: "eventName",
      title: "Event Name",
      type: "string"
    }
  ]
}