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

  def edit
    @card = Card.find(params[:id])
    @list = @card.list
  end

  def update
    @card = Card.find(params[:id])
    @list = List.find(params[:list_id])
    if @card.update(card_params)
      redirect_to lists_path
    else
      flash[:errors] = @card.errors.full_messages.join(', ')
      render :edit
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    redirect_to lists_path
  end

  private
  def card_params
    params.require(:card).permit(:text, :completed)
  end
end
