class CardsController < ApplicationController
  def new
    @list = List.find(params[:list_id])
    @card = Card.new
  end

  def create
    @list = List.find(params[:list_id])
    @card = Card.new(card_params)
    @card.list = @list
    if @card.save
      redirect_to lists_path
    else
      flash[:error] = @card.errors.full_messages.join(", ")
      render :new
    end
  end

  private
  def card_params
    params.require(:card).permit(:text, :completed)
  end
end
