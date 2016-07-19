class Api::ListsController < ApiController
  def index
    lists = List.all
    render json: { lists: lists }, status: :ok
  end
end
