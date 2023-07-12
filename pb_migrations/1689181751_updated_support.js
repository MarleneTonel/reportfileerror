migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rofpdiwv",
    "name": "status",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqmxpml1",
    "name": "file",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 99,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // remove
  collection.schema.removeField("rofpdiwv")

  // remove
  collection.schema.removeField("uqmxpml1")

  return dao.saveCollection(collection)
})
