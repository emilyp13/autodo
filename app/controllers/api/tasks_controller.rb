class Api::TasksController < ApiController
  def create
    task = Task.new(text: params[:name])
    task.card = Card.find(params[:card_id])
    task.board = Board.find(params[:board_id])
    task.save
    render json: { task: task }, status: :ok
  end

  def update
    task = Task.find(params[:id])
    task.update(completed: params[:completed])
    tasks = Task.where(board_id: params[:board_id])
    render json: { tasks: tasks }, status: :ok
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    tasks = Task.where(board_id: params[:board_id])
    render json: { tasks: tasks }, status: :ok
  end
end
