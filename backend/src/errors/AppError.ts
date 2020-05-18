/**
 * @class clases appError para mensagens de erro
 */
class AppError{
  public readonly message: string;

  public readonly statusCode: number;
  /**
   * 
   * @constructor Objeto Construtor da classe AppError 
   */
  constructor(message: string, statusCode = 400){
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
