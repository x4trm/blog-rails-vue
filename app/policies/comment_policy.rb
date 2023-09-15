class CommentPolicy < ApplicationPolicy
    def index?
      true
    end
  
    def create?
      return true if @user
    end
  
    def destroy?
      return true if @user && @user.admin
    end
end
