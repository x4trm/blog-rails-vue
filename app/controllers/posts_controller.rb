class PostsController < ApplicationController
    before_action :set_post, only: %i[show edit update destroy]
    before_action :authenticate_user!, except: %i[show index]
    # GET /posts
    def index
      @posts = Post.paginate(:page => params[:page], :per_page => 2)
      # @posts = Post.all.order(created_at: :desc)
      render json: @posts
    end
  
    # GET /posts/1
    def show
      render json: @post
    end
  
    # POST /posts
    def create
      @post = Post.new(post_params)
  
      if @post.save
        render json: @post, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /posts/1
    def update
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /posts/1
    def destroy
      @post.destroy
      head :no_content
    end
  
    private
  
    def set_post
      @post = Post.find(params[:id])
    end

    # def set_comment
    #   @comment = Comment.find(params[:id])
    # end
  
    def post_params
      params.require(:post).permit(:title, :body, :user_id)
    end
  end
  