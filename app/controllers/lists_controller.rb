class ListsController < ApplicationController
  def index
    @lists = List.all
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to lists_path
    else
      flash[:error] = @list.errors.full_messages.join(', ')
      render :new
    end
  end

  def edit
    @list = List.find(params[:id])
  end

  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      redirect_to lists_path
    else
      flash[:error] = @list.errors.full_messages.join(', ')
      render :edit
    end
  end

  private
  def list_params
    params.require(:list).permit(:title)
  end
end
