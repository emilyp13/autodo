class CardsController < ApplicationController
  before_action :authenticate_user!

  def edit
    @card = Card.find(params[:id])
  end

  def update
    @card = Card.find(params[:id])
    @card.board = Board.find(params[:board_id])
    if @card.update(card_params)
      redirect_to board_path(@card.board)
    else
      flash[:errors] = @card.errors.full_messages.join(', ')
      render :edit
    end
  end

  private

  def card_params
    params.require(:card).permit(:text, :description)
  end
end
