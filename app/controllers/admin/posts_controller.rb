class Admin::PostsController < ApplicationController
before_action :set_post, only: %i[show edit update destroy]
before_action :require_admin

def require_admin
    if @user && @user.admin?
        render json: {errors: {'error'=>"Not authorized"}},status: :unprocessable_entity
    end
end
def index
    @posts = Post.paginate(:page => params[:page], :per_page => 10)
    total_posts = Post.count
    render json: { posts: @posts, total_posts: total_posts}
end
def show
    render json: @post
end
    # POST /posts
    def create
      @post = Post.new(post_params)
      authorize @post
  
      if @post.save
        render json: @post, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /posts/1
    def update
        authorize @post
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /posts/1
    def destroy
      authorize @post
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