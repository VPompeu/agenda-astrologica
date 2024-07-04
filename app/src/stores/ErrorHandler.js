export default function handleCommonErrors(error) {
    let errorMessage = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';

    if (error.response) {
        // O servidor respondeu com um status de erro
        if (error.response.status === 400) {
            errorMessage = 'Requisição inválida. Verifique seus dados e tente novamente.';
        } else if (error.response.status === 404) {
            errorMessage = 'Recurso não encontrado.';
        } else if (error.response.status === 500) {
            errorMessage = 'Erro interno do servidor. Por favor, tente novamente mais tarde.';
        }
        // Você pode adicionar mais condições conforme necessário para lidar com outros códigos de status
    } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        errorMessage = 'Não foi possível receber resposta do servidor. Por favor, verifique sua conexão com a internet.';
    } else {
        console.log(error)
        // Algum outro erro ocorreu durante a configuração da requisição
        errorMessage = 'Ocorreu um erro ao enviar a requisição. Por favor, tente novamente mais tarde.';
    }

    alert(errorMessage);
};