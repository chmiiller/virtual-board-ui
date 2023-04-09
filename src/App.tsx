import ReactFlow, { Background, Connection, ConnectionMode, Controls, addEdge, useEdgesState, useNodesState } from 'reactflow';
import { zinc } from 'tailwindcss/colors';
import 'reactflow/dist/style.css'
import { Square } from './components/nodes/Square';
import { useCallback } from 'react';
import DefaultEdge from './components/edges/DefaultEdge';
import * as Toolbar from '@radix-ui/react-toolbar';

const NODE_TYPES = {
  square: Square
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [] satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges));
  }, []);

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: { x: 100, y: 100 },
        data: {},
      }
    ])
  }

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background
          gap={12}
          size={2}
          color={zinc[200]}
          style={{}}
        />
        <Controls />
      </ReactFlow>
      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button className='w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2'
          onClick={addSquareNode}
        />
      </Toolbar.Root>
    </div>
  )
}

export default App
