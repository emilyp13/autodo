class Api::ListsController < ApiController
  def index
    cards = Card.where(board_id: params[:board_id])
    lists = List.where(board_id: params[:board_id])
    tasks = Task.where(board_id: params[:board_id])
    tags = Tag.where(board_id: params[:board_id])
    cardtags = Cardtag.where(board_id: params[:board_id])
    category = Board.find(params[:board_id]).category
    render json: { lists: lists, cards: cards, tasks: tasks, category: category, cardtags: cardtags, tags: tags  }, status: :ok
  end

  def create
    list = List.new(title: params[:text])
    list.board = Board.find(params[:board_id])
    list.save
    render json: { list: list }, status: :ok
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    lists = List.where(board_id: params[:board_id])
    render json: { lists: lists }, status: :ok
  end
end
