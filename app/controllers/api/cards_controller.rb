class Api::CardsController < ApiController
  def index
    cards = Card.all
    render json: { cards: cards }, status: :ok
  end
end
