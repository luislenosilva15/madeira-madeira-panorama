import { ParseStringToHTML } from "../util/ParseUtils";

export function OptionsModal() {
    return ParseStringToHTML(`
        <div class="modal fade" id="function-modal-state" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header d-flex flex-row justify-content-center">
                        <div class="text-center custom-modal-title">
                            Experimente alguma das opções para melhorar a sua interatividade na sala de estar!
                        </div>
                        
                        <div type="button" id="function-modal-close" class="close modal-close-button" data-dismiss="modal" aria-label="Close">
                            <div aria-hidden="true">&times;</div>
                        </div>
                    </div>
                    <div class="modal-body d-flex flex-row justify-content-center">
                        <img class="img-fluid" src="./img/modal-image.png" />
                    </div>
                    <div class="modal-footer d-flex flex-row justify-content-around">
                        <div id="function-fullscreen" class="custom-modal-option-button">Expandir tela</div>
                        <div id="function-viewmode" class="custom-modal-option-button">Habilitar 360º</div>
                    </div>
                </div>
            </div>
        </div>
    `);
}