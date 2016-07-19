# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
List.create(title: "To Do", id: 4)
List.create(title: "In Progress", id: 2)
List.create(title: "Completed", id: 3)
Card.create(text: "Create more features", list_id: 4)
Card.create(text: "Go to the grocery store", list_id: 4)
