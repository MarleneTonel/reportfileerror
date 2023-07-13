migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // remove
  collection.schema.removeField("l6pccnzr")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4ue67cqev6sbx71")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l6pccnzr",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("qyiizscf")

  return dao.saveCollection(collection)
})
