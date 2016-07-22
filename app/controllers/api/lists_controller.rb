class Api::ListsController < ApiController

  def grabListsAndCards
    @cards = Card.all
    @lists = List.all
  end

  def index
    grabListsAndCards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def create
    grabListsAndCards
    list = List.new(title: params[:text])
    list.save
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def destroy
    grabListsAndCards
    @list = List.find(params[:id])
    @list.destroy
    render json: { lists: @lists, cards: @cards }, status: :ok
  end
end
