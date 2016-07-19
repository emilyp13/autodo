class Api::CardsController < ApiController
  def index
    cards = Card.where(list_id: params[:list_id])
    if cards.nil?
      cards = []
    end
    render json: { cards: cards }, status: :ok
  end
end
