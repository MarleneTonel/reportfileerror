migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // remove
  collection.schema.removeField("qyiizscf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r0l8jbbs",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qyiizscf",
    "name": "email",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("r0l8jbbs")

  return dao.saveCollection(collection)
})
