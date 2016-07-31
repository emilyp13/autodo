class TagsController < ApplicationController

  def new
    @tag = Tag.new
    @tag.board = Board.find(params[:board_id])
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.board = Board.find(params[:board_id])
    if @tag.save
      redirect_to board_path(@tag.board)
    else
      render :new
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:label, :color, :board_id)
  end
end
