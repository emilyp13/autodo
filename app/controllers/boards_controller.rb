class BoardsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @boards = Board.all
  end

  def show
    @board = Board.find(params[:id])
  end

  def new
    @board = Board.new
  end

  def create
    @board = Board.new(board_params)
    @board.user = current_user
    if @board.save
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
