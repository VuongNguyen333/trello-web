import ListColumns from './ListColumns/ListColumns'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sorts'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  getFirstCollision,
  pointerWithin
} from '@dnd-kit/core'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}


const BoardContent = React.memo( function BoardContent({ board }) {

  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  // const sensors = useSensors(pointerSensor)
  // uu tien 2 loai sensor la mouse va touch de fix bug tren mobile
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])

  // Cung` 1 thoi` diem? chi? co' the? keo 1 kieu
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //diem va cham cuoi cung
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBeetweenDifferentColumn = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Clone lai mang column roi cap nhat
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      // column cu~ sau khi beo tha
      if (nextActiveColumn) {
        // xoa' (loc.) ra card vua` duoc keo' tha? sang column khac
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // cap nhat lai mang cardOrderIds sau khi keo tha
        if (isEmpty(nextActiveColumn?.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // console.log('🚀 ~ BoardContent ~ nextActiveColumn:', nextActiveColumn)
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards.map(card => card._id)
        // console.log('🚀 ~ BoardContent ~ nextActiveColumn:', nextActiveColumn)
      }
      // column moi sau khi beo tha
      if (nextOverColumn) {
        // neu card dang keo dang ton` tai trong overColumn thi phai xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Them card dang keo vao overColumn voi index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          { ...activeDraggingCardData, columnId: nextOverColumn._id }
        )
        // xoa cardHolder di neu co
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card.FE_PlaceholderCard !== true)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('🚀 ~ BoardContent ~ nextColumns:', nextColumns)
      return nextColumns
    })
  }

  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // console.log('🚀 ~ handleDragOver ~ event:', event)
    // ko lam gi neu keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // moi event se co active va over
    const { active, over } = event
    // neu khong ton tai over thi return tranh bi crash
    if (!active || !over) return

    //activeDraggingCard: card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    // => tim` duoc 2 column theo card Id
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    // console.log('🚀 ~ handleDragOver ~ activeColumn:', activeColumn)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      moveCardBeetweenDifferentColumn(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )

    }
  }

  // Trigger trong qua trinh keo phan tu
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    // console.log('🚀 ~ handleDragEnd ~ event:', event)

    // Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      //activeDraggingCard: card dang duoc keo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      // => tim` duoc 2 column theo card Id
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // neu khong co active va overColumn thi return de tranh crash
      if (!activeColumn || !overColumn) return
      // phải set state oldColumnWhenDraggingCard từ bước handleDragStart, vì khi đến bước DragOver, biến activeColumn đã được set lại sau khi va chạm với card ở column khác, rồi trước khi endDrag thì event đã nhận sự kiện card đó đang được kéo và hđ thả ra được coi như DragEnd tại chỗ
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // console.log('keo tha card giua 2 column khac')
        moveCardBeetweenDifferentColumn(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Keo tha trong cung 1 column
        // console.log('event::, ', event)
        if (active.id !== over.id) {
          // vi tri cu cua column
          const oldCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id === activeDragItemId)
          const newCardIndex = oldColumnWhenDraggingCard?.cards.findIndex(c => c._id === overCardId)

          const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
          setOrderedColumns(prevColumns => {
            // Clone lai mang column roi cap nhat
            const nextColumns = cloneDeep(prevColumns)

            // tim column dang keo tha
            const targetColumn = nextColumns.find(c => c._id === overColumn._id)
            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
            return nextColumns
          })
        }
      }
    }

    // Xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // vi tri cu cua column
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('🚀 ~ handleDragEnd ~ dndOrderedColumns:', dndOrderedColumns)
        // console.log('🚀 ~ handleDragEnd ~ dndOrderedColumnsIds:', dndOrderedColumnsIds)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: { active: { opacity: '0.5' } }
    })
  }
  // args: cac tham so
  // custom
  const collisionDetectionStrategy = useCallback((args) => {
    // dung closestCorners khi keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    const pointerIntersections = pointerWithin(args)
    // console.log('🚀 ~ pointerIntersections:', pointerIntersections)
    if (!pointerIntersections?.length) return
    // Collision detection algorithms return an array of collisions
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)
    // tim overId tim duoc khi keo tha
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)

      if (checkColumn) {
        // console.log('🚀 ~ overId::1::', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }
      // console.log('🚀 ~ overId::2::', overId)

      lastOverId.current = overId
      // console.log('🚀 ~ collisionDetectionStrategy ~ overId:', overId, ' ::pointerIntersections', pointerIntersections)
      return [{ id: overId }]
    }
    // If there are no collisions with the pointer, return rectangle intersections
    // console.log('🚀 ~ lastOverId.current:', lastOverId.current)
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      // cam bien keo tha
      onDragStart={handleDragStart}
      // Thuat toan phat hien va cham
      // neu chi dung closestCorners thi se co bug flickering + sai lech du lieu
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext >
  )
})

export default BoardContent