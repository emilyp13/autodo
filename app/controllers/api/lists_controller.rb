class Api::ListsController < ApiController
  def grab_lists_and_cards
    @cards = Card.where(board_id: params[:board_id])
    @lists = List.where(board_id: params[:board_id])
    @tasks = Task.where(board_id: params[:board_id])
  end

  def index
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards, tasks: @tasks }, status: :ok
  end

  def create
    list = List.new(title: params[:text])
    list.board = Board.find(params[:board_id])
    list.save
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards, tasks: @tasks }, status: :ok
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards, tasks: @tasks }, status: :ok
  end
end
