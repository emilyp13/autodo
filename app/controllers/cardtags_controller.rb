class CardtagsController < ApplicationController

  def new
    @cardtag = Cardtag.new
    @cardtag.card = Card.find(params[:card_id])
    @board = @cardtag.card.board
    @available_tags = Tag.where(board_id: @board.id)
  end

  def create
    @cardtag = Cardtag.new
    @cardtag.card = Card.find(params[:card_id])
    @cardtag.tag = Tag.find(params[:tag])
    @cardtag.board = @cardtag.card.board
    if @cardtag.save
      redirect_to board_path(@cardtag.board)
    else
      render :new
    end
  end
end
