port module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (attribute)
import Html.Events exposing (onClick)



-- MAIN


main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }



-- PORTS


port setValue : Int -> Cmd msg


port reset : () -> Cmd msg


port getValue : (Int -> msg) -> Sub msg



-- MODEL


type alias Model =
    Maybe Int


init : () -> ( Model, Cmd Msg )
init _ =
    ( Nothing, Cmd.none )



-- UPDATE


type Msg
    = Increment
    | Decrement
    | GetValue Int
    | Reset


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            case model of
                Just value ->
                    ( Just <| value + 1, setValue <| value + 1 )

                Nothing ->
                    ( model, Cmd.none )

        Decrement ->
            case model of
                Just value ->
                    ( Just <| value - 1, setValue <| value - 1 )

                Nothing ->
                    ( model, Cmd.none )

        GetValue value ->
            ( Just value, Cmd.none )

        Reset ->
            ( model, reset () )



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , div [ attribute "data-cypress-id" "counter-num" ]
            [ text
                (case model of
                    Just value ->
                        String.fromInt value

                    Nothing ->
                        "Now loading"
                )
            ]
        , button [ onClick Increment ] [ text "+" ]
        , div [] []
        , button [ onClick Reset ] [ text "reset" ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    getValue GetValue
