# Breakable Toy
![Build Status](https://codeship.com/projects/02fbb9c0-2f4e-0134-5989-563e54af7ce1/status?branch=master)
![Code Climate](https://codeclimate.com/github/emilyp13/breakable_toy.png)
![Coverage Status](https://coveralls.io/repos/emilyp13/breakable_toy/badge.png)


###My breakable toy is a stripped-down Trello clone using React and Rails. For my reach stories, I hope to implement some of my own personal features.

##MVP ERD:
![alt text](https://github.com/emilyp13/breakable_toy/app/assets/images/mvp_bt.tiff "MVP ERD")

###Card User Stories

'''
As a user/I want to create a card/so that I can list different items or tasks
  - AC:
    [] card requires text
    [] card belongs to a list

As a user/I want to view cards/so that I can get stuff done
  - AC:
    [] each card shows text
    [] each card show completed or not

As a user/I want to edit a card's text/so that I can change my mind
  - AC:
    [] card requires text
    [] card belongs to a list

As a user/I want to delete a card/so that I can remove a card if I don't want to do anything with it
  - AC:
    [] card is deleted from list
    [] success message

As a user/I want to mark a card as complete/so that I can work on my to do list
  - AC:
    [] card marked as completed
    [] card isn't deleted, but faded out - user can delete if they want

'''

###List Model Stories

'''
As a user/I want to create a list/so that I can have distinct lists
  - AC:
    [] list requires a title

As a user/I want to view lists/so that I can categorize my cards
  - AC:
    [] each list shows a title
    [] each list shows its cards

As a user/I want to edit a list's title/so that I can change my mind
  - AC:
    [] list requires a title

As a user/I want to delete a list/so that I can remove a list when I'm finished with it
  - AC:
    [] list and all its cards are deleted from db
    [] success message
'''

React User Stories

'''
As a user/I want to drag and drop cards into my lists/so that I can organize my cards
  - AC:
    [] implement in React
    [] can't reload the page
'''

##Reach ERD - Acceptance Stories TBD:
![alt text](https://github.com/emilyp13/breakable_toy/app/assets/images/reach_bt.tiff "Reach ERD")

###Additional Card Stores
'''
As a user/I want to give my cards categories/so that I can filter through my cards
As a user/ I want to receive points whenever I complete a card/so that I can feel validated in my productivity
As a user/I want to give my cards due dates/so that I can better organize my cards
'''

###Board Model Stories
'''
As a user/I want to create a board/so that I can view my cards and track different things
As a user/I want to see multiple boards/so that I can switch between boards
As a user/I want to edit a board's title/so that I can change my mind
As a user/I want to delete a board/so that I can remove a board when I'm finished with it
As a user/I want to set my board category as kanban or calendar/so that I have different ways of viewing my lists
'''

###User Model Stories - Devise
'''
As a user/I want to create an account (a user)/so that I can view my only my boards
As a user/I want to delete my account/so that I don't have to use the app anymore
'''
