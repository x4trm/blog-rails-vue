class CommentsController < ApplicationController
    before_action :set_post, only: [:index, :create]
    before_action :set_comment, only: [:show, :edit, :update, :destroy]
    
    # GET /posts/:post_id/comments
    def index
      # @comments = @post.comments
      @comments = @post.comments.paginate(:page => params[:page], :per_page => 7)
      total_comments = @comments.count
      render json: { comments: @comments, total_comments: total_comments}
    end
  
    # GET /comments/1
    def show
      render json: @comment
    end
  
    # POST /posts/:post_id/comments
    def create
      @comment = @post.comments.build(comment_params)
      authorize @comment
      if @comment.save
        render json: @comment, status: :created
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end
  
    # # PATCH/PUT /comments/1
    # def update
    #   if @comment.update(comment_params)
    #     render json: @comment
    #   else
    #     render json: @comment.errors, status: :unprocessable_entity
    #   end
    # end
  
    # DELETE /comments/1
    def destroy
      authorize @comment
      @comment.destroy
      head :no_content
    end
  
    private
  
    def set_post
      @post = Post.find(params[:post_id])
    end
  
    def set_comment
      @comment = Comment.find(params[:id])
    end
  
    def comment_params
      params.require(:comment).permit(:body, :user_id)
    end
  end