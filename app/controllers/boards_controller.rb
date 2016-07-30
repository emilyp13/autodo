class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = Board.where(user: current_user)
  end

  def show
    @board = Board.find(params[:id])
    if @board.category == "calendar"
      Board.check_today(@board)
    end
  end

  def new
    @board = Board.new
  end

  def create
    @board = Board.new(board_params)
    @board.user = current_user
    if @board.save
      if @board.category == "calendar"
        List.generate_calendar(Date.today, @board.id)
      end
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    redirect_to root_path
  end

  private

  def board_params
    params.require(:board).permit(:title, :category)
  end
end
