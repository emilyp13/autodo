class Api::TasksController < ApiController
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
    task = Task.new(text: params[:name])
    task.card = Card.find(params[:card_id])
    task.board = Board.find(params[:board_id])
    task.save
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards, tasks: @tasks }, status: :ok
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards, tasks: @tasks }, status: :ok
  end
end
